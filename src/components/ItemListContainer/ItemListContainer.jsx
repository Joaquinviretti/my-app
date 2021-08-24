import { useEffect } from "react"
import { useState } from "react"
import ItemList from "../ItemList/ItemList"
import "./ItemListContainer.scss"
import Container from "react-bootstrap/Container"
import { useParams } from "react-router-dom"
import { firestore } from "../../firebase/firebase"


const ItemListContainer = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {

    const db = firestore

    /* let data = [{ "title": "Apple Watch Series 5", "description": "Apple Watch Series 3 con altímetro integrado, coaching inteligente, una app Frecuencia Cardiaca más poderosa y un procesador más potente. Además, siempre tendrás tus playlists favoritas en la muñeca. Es el dispositivo perfecto para que estés más activo, motivado y conectado que nunca.", "price": 47999, "categoryId": 1, "pictureUrl": "apple-watch-series3.png" }, { "title": "Samsung Galaxy Watch 3", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 1, "pictureUrl": "galaxy-watch-3.png" }, { "title": " Amazfit Bip Xiaomi", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 2, "pictureUrl": "amazfit-bip.png" }, { "title": "Huawei Watch GT 2e", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 2, "pictureUrl": "huawei-watch-g2.png" }, { "title": "Xiaomi Mi Watch", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 2, "pictureUrl": "xiaomi-miwatch.png" }, { "title": "Garmin Vivomove 3", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 1, "pictureUrl": "garmin-vivomore.png" }, { "title": "TicWatch Pro 3", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 1, "pictureUrl": "tic-watch.png" }, { "title": " Honor Band 6", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 1, "pictureUrl": "honor-band-6.png" }, { "title": " Casio G Shock", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "price": 1250, "categoryId": 1, "pictureUrl": "casio-g.png" }]
     data.forEach((producto) => {
       db.collection("productos").add(producto)
     })*/

    const collection = db.collection("productos")

    let query = [];

    if (id) {

      const filtro = collection.where("categoryId", "==", parseInt(id))
      query = filtro.get()

    } else {
      query = collection.get()
    }


    query.then((resultados) => {

      const resultado_parseado = []

      resultados.forEach((documento) => {
        const id = documento.id
        const data = documento.data()
        const data_final = { id, ...data }
        resultado_parseado.push(data_final)

      })

      setProducts(resultado_parseado)
      setIsLoading(false)
    }, [id])

  })

  return (
    <Container className="mt-5 itemListContainer">
      <ItemList products={products} isLoading={isLoading} />
    </Container>
  )
}

export default ItemListContainer

