import React from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { getMarket } from '../graphql/queries';
import { onCreateProduct, onUpdateProduct, onDeleteProduct } from '../graphql/subscriptions';
import { Loading, Tabs, Icon } from "element-react";
import { Link } from 'react-router-dom';
import NewProduct from '../components/NewProduct';
import Product from '../components/Product';



class MarketPage extends React.Component {
  state = {
    market: null,
    isLoading: true, 
    isMarketOwner: false 
  };

  componentDidMount() {
    this.handleGetMarket();
    const {
      attributes: { sub }
    } = this.props.user;
 
    try {
      this.createProductListener = API.graphql(graphqlOperation(onCreateProduct, { owner: sub }))
      .subscribe({
        next: productData => {  
          const createProduct = productData.value.data.onCreateProduct;
          const prevProducts = this.state.market.products.items.filter(
            item => item.id !== createProduct.id
          )
          const updatedProducts = [createProduct, ...prevProducts]
          const market = { ...this.state.market };
          market.products.items = updatedProducts;
          this.setState({ market });
        }
      })
    } catch (error) {
      console.error('error with onCreateProduct subscription', error)
    }

    try {
      this.updateProductListener = API.graphql(graphqlOperation(onUpdateProduct, { owner: sub } ))
      .subscribe({
        next: productData => {
          const updatedProduct = productData.value.data.onUpdateProduct
          const updatedProductIndex = this.state.market.products.items.findIndex(
            item => item.id === updatedProduct.id
          )    
        const updatedProducts = [
          ...this.state.market.products.items.slice(0, updatedProductIndex),
          updatedProduct,
          ...this.state.market.products.items.slice(updatedProductIndex + 1)
        ]
        const market = { ...this.state.market };
        market.products.items = updatedProducts;
        this.setState({ market });
      }
      });
    } catch (error) {
      console.error("error with on update product subscription", error)
    }

    try {
      this.deleteProductListener = API.graphql(graphqlOperation(onDeleteProduct, { owner: sub } ))
      .subscribe({
        next: productData => {  
          const deletedProduct = productData.value.data.onDeleteProduct;
          const deletedProducts = this.state.market.products.items.filter(
            item => item.id !== deletedProduct.id
          )
          const market = { ...this.state.market };
          market.products.items = deletedProducts;
          this.setState({ market });
        }
      });
    } catch(error) {
      console.error('error with on delete product subscription', error)
    }

    

   
  }
 
   componentWillUnmount() {
     this.createProductListener.unsubscribe();
     this.updateProductListener.unsubscribe();
     this.deleteProductListener.unsubscribe();
   }


  handleGetMarket = async () => {
    const input = {
      id: this.props.marketId
    }
    const result = await API.graphql(graphqlOperation(getMarket, input ))
    this.setState({ market: result.data.getMarket, isLoading: false}, 
      () => {this.checkMarketOwner()}
    );
  };

  checkMarketOwner = () => {
    const { user }  = this.props;
    const { market } = this.state;
    if( user ){
      this.setState({ isMarketOwner: user.username === market.owner });
    }
  }
  
  // display marketId that we passed through props
  render() {
    // destructure from state
    const { market, isLoading, isMarketOwner } = this.state;
    const { user } = this.props;

  {/* return markup only if isLoading is set to false */}
    return isLoading ? (
      <Loading fullscreen={true} />
    ) : (
      <>
      {/* Back Button */}
       <Link className="link" to="/">
        Back to Markets List
       </Link>

       {/* Market MetaData */}
       <span className="items-center ppt-2">
        <h2 className="mb-mr">{market.name}</h2>- {market.owner}
       </span>

       <div className="items-center pt-2">
        <span style= {{ color: 'var(--lightSquidInk)', paddingBottom: "1em"}}>
          <Icon name="date" className="icon" />
          {market.createdAt}
          </span>
       </div>

       {/*  New Product */}
       <Tabs type="border-card" value= {isMarketOwner ? "1" : "2"}>
        {/*  Ability to add new market for market owner only */}
        {
          isMarketOwner && (
            <Tabs.Pane 
                label={
                  <>
                    <Icon name="plus" className="icon"/>Add Product
                  </>
                }
                name="1"
            >
              <NewProduct user={user} marketId={this.props.marketId} />
            </Tabs.Pane>
          )
        }
        {/* Products List */}
        <Tabs.Pane
          label = {
            <>
              <Icon name="menu" className="icon" />
              Products ({ market.products.items.length })
            </>
          }      
          name="2"
          >
          {/* Pane name is 2 */}

          {/* map over products*/}
          <div className="product-list">
            {market.products.items.map(product => (
              <Product key={product.id} product={product}/>
            ))} 
          </div>
        </Tabs.Pane>
        </Tabs>
      </>
    )
  }
}

export default MarketPage;