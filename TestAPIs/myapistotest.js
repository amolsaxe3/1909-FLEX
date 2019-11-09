let companies = 'https://acme-users-api-rev.herokuapp.com/api/companies'
let products = 'https://acme-users-api-rev.herokuapp.com/api/products'
let offerings = 'https://acme-users-api-rev.herokuapp.com/api/offerings'

//-------------------------------------------------------------------------
// Price Range of product

const findProductInPriceRange = (url , outPutMinMax) => new Promise((res, rej) => {
  // can change url to /api/products, /api/offerings for the other ones
 
window.fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('findProductInPriceRange')
    const outPut =  data.filter(priceJSON => {
      if(outPutMinMax.max > priceJSON.suggestedPrice 
        && outPutMinMax.min < priceJSON.suggestedPrice){
        `${console.log(priceJSON.name)}`
      }
    }).join('')
  })
  .catch(e => rej(e));
})


let ProductInPriceRange = () => findProductInPriceRange(products , {min: 1, max: 15})
ProductInPriceRange()
////////

//-------------------------------------------------------------------------
//Key Company Letter and Array of those Companies 

const groupCompaniesByLetter = (company) => new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    let array = []
    window.fetch(company)
              .then(response => response.json())
              .then( data => {
                console.log('groupCompaniesByLetter')
                let companyLetterVal = ''
                let companyArr = ''
                const outPut =  data.map( companyName => { 
                  companyLetterVal = companyName.name[0] + ': ' 
                  companyArr = companyName
                  return `${console.log(companyLetterVal, companyArr)}`
                })
              })
              .catch(e => rej(e));
    
    })
    
    let groupedCompaniesByLetter = () => groupCompaniesByLetter(companies)
    groupedCompaniesByLetter()
/////////**////////////////// */
    // Key State and Array of those companies 
const groupCompaniesByState = (company) => new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    
    window.fetch(company)
      .then(response => response.json())
      .then( data => {
        console.log('groupCompaniesByState')
        let companyStateValue = ''
        let companyArr = ''
        const outPut =  data.filter( companyName => { 
          companyStateValue = companyName.state + ': ' 
          companyArr = companyName
            return `${console.log(companyStateValue, companyArr)}`
        })
    })
    .catch(e => rej(e));
    
    })
    
    let groupedCompaniesByState = () => groupCompaniesByState(companies)
    groupedCompaniesByState()

        //end of comapies related data fetch...
//-------------------------------------------------------------------------
    //end of comapies related data fetch...
//-------------------------------------------------------------------------

    //Processed offering
const processOffering = (offer, product, company) => new Promise( (res, rej) => {
    Promise.all([fetch(offer), fetch(product), fetch(company)])
    .then( response => response.map( responses => responses.json()))
    .then( data => {
      let offers = data[0]
      
      let offerProducts = data[1]

      let offerCompanies = data[2]

      let outPut = {}
        
      console.log('processOffering')
  
      return offers.then(offering => offering.filter( offerElement => {
        
          if(!outPut[offerElement.id]){
            outPut[offerElement.id]= offerElement
            outPut[offerElement.id]                
        }

        offerProducts.then(productOffer => productOffer.filter( productElement  => {
          if(outPut[offerElement.id].productId.includes(productElement.id)){
            outPut[offerElement.id].product =  productElement
            outPut[offerElement.id]
          }
        }))

        offerCompanies.then(companyOffer => companyOffer.filter( companyElement  => {
          if(outPut[offerElement.id].companyId.includes(companyElement.id)){
            outPut[offerElement.id].company = companyElement
            console.log({offer: outPut[offerElement.id] , company: outPut[offerElement.id].company , product: outPut[offerElement.id].product} )
          }
        }))
      }))
              
      })
      .catch(e => rej(e))
  })
  
  let processedOffering = () => processOffering(offerings,products,companies)
  processedOffering()
  