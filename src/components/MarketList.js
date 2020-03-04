import React from "react";
import { graphqlOperation } from 'aws-amplify';
import { onCreateMarket } from '../graphql/subscriptions';
import { Connect } from 'aws-amplify-react';
import { listMarkets } from '../graphql/queries';
import Error from './Error';
import { Loading, Card, Tag, Icon } from "element-react";
import { Link } from 'react-router-dom';

const MarketList = ({ searchResults }) => {
  const onNewMarket = (prevQuery, newData) => {
    // copying our previous market list
    let updateQuery = { ...prevQuery };
    const updatedMarketList = [
      // adding the newly created market from subscription
      newData.onCreateMarket,
      ...prevQuery.listMarkets.items
    ]
    // updating the array of markets that we had with the one we created with newData
    updateQuery.listMarkets.items = updatedMarketList;
    // returning it
    return updateQuery
  }

  return (
    <Connect
      // get data, loading, errors from query 
      query={graphqlOperation(listMarkets)}
      subscription={graphqlOperation(onCreateMarket)}
      // get access to new market data
      onSubscriptionMsg={onNewMarket}
    >
      {({data, loading, errors}) => {

          if (errors.length > 0)  return  <Error errors={errors} />
          if (loading || !data.listMarkets) return <Loading fullscreen={true} />
          
          const markets = searchResults.length > 0 ? searchResults : data.listMarkets.items

          return (
            <> 
              { searchResults.length > 0 
                ? (
                  <h2 className="header">
                    <Icon type="success" name="check" className="icon" />
                    {searchResults.length}{' '}Results
                  </h2>
                ) 
                : (
                  <h2 className="header">
                    <img src="https://icon.now.sh/store_mall_directory/527FFF" className="large-icon" alt="store-icon" />
                    Markets
                  </h2>
                )
              }
              {
                markets.map(market => (
                  <div className="my-2" key={market.id}>
                    <Card
                      bodyStyle={{
                        padding: "0.7em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span className="flex">
                          <Link className="link" to={`/markets/${market.id}`}>
                            {market.name}
                          </Link>
                          <span style={{ color: 'var(--darkAmazonOrange)' }}>
                            { market.products.items ? market.products.items.length : 0}
                          </span>
                          <img src="https://icon.now.sh/shopping_cart/f60" alt="shopping cart" />
                        </span>
                        <div style={{ color: 'var(--lightSquidInk)' }}>
                          {market.owner}
                        </div>
                      </div>
                      <div>
                        {
                          market.tags && market.tags.map(tag => (
                            <Tag key={tag} type="danger" className="mx-1">
                              {tag}
                            </Tag>
                          ))
                        }
                      </div>
                    </Card>
                  </div>
                ))
              }
            </>
          )
        }
      }
    </Connect>
  )
};

export default MarketList;
