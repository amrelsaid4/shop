import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Iprops{}
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[] 
}
const ProductPage = ({}: Iprops) => {
    const {id} = useParams<{id : string}>();
    const navidate = useNavigate();
    const [product , setProduct] =useState<Product | null>(null)


    useEffect(()=>{
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then((response) => {
                setProduct(response.data);
            }).catch(e => {
                console.error(`Error fetchind product data: ${e}`)
            })
        }
    }, [id]);


    if(!product){
        return <h1>loading...</h1>
    }
  return <div></div>;
};

export default ProductPage;
