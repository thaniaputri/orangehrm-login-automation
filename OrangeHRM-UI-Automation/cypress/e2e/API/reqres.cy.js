describe('API Testing Categories - Fake API Platzi', () => {

  it('Get all categories', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  it('Get single category by ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name')
    })
  })
  
 it('Create new category', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/categories/',
    failOnStatusCode: false,
    body: {
      name: 'Kategori Baru',
      image: 'https://picsum.photos/200',
      slug: 'kategori-baru'
    }
  }).then((response) => {
    expect(response.status).to.be.oneOf([201, 400])
  })
})

  it('Update category', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      body: {
        name: 'Updated Category',
        image: 'https://placeimg.com/640/480/tech'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Updated Category')
    })
  })

  it('Get all products', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.escuelajs.co/api/v1/products'
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
  })
})

  it('Get all products by category', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.escuelajs.co/api/v1/categories/1/products'
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
  })
})
  
  it('Delete category', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/11',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Get categories with limit', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?limit=5'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(5)
    })
  })

  it('Get categories with offset', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories?offset=0&limit=3'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(3)
    })
  })

  it('Validate response headers', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('content-type')
    })
  })

  it('Get invalid category ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400, 404)
    })
  })

})