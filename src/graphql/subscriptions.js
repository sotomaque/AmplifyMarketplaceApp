/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMarket = /* GraphQL */ `
  subscription OnCreateMarket {
    onCreateMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateMarket = /* GraphQL */ `
  subscription OnUpdateMarket {
    onUpdateMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteMarket = /* GraphQL */ `
  subscription OnDeleteMarket {
    onDeleteMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String!) {
    onCreateProduct(owner: $owner) {
      id
      description
      file {
        bucket
        region
        key
      }
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
      }
      price
      shipped
      owner
      createdAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String!) {
    onUpdateProduct(owner: $owner) {
      id
      description
      file {
        bucket
        region
        key
      }
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
      }
      price
      shipped
      owner
      createdAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String!) {
    onDeleteProduct(owner: $owner) {
      id
      description
      file {
        bucket
        region
        key
      }
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
      }
      price
      shipped
      owner
      createdAt
    }
  }
`;
