"use client"

export default function Chave(){

    return(<>
        <h1>componente cliente :</h1>
        <p>testadno visibilidade</p>
        <h1> {process.env.DB_API_URL}</h1>
        </>
    )

}