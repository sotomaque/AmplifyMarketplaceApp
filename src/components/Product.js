import React from "react";
import { S3Image } from 'aws-amplify-react';
import { Notification, Popover, Button, Dialog, Card, Form, Input, Radio } from "element-react";

class Product extends React.Component {
  state = {};
  
  render() {
    const { product } = this.props;
    console.log(product)
    return <div className="card-container">
      <Card bodyStyle={{ padding: 0, minWidth: '200px' }}>
      {/*
        // <S3Image 
        //   imgKey={product.file.key}
        //   theme={{
        //     photoImg: { maxWidth:'100%', maxHeight: '100%' }
        //   }}
        // />
      */}
        <div className="card-body">
          <h3 className="m-0">{product.description}</h3>
          <div className="items-center">
            <img 
              src={`https://icon.now.sh/${product.shipped ? "markunread_mailbox" : "mail"}`}
              alt="Shipping Icon"
              className="icon"
            />
          </div>
        </div>
      </Card>
    </div>
  }
}

export default Product;
