import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import CheckoutProductsCard from "./CheckoutProductsCard";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        if (!localStorage.user) {
            history.push("/");
            return;
        }
        if (user) {
            getCartProducts();
        }
        // eslint-disable-next-line
    }, [user]);

    function getCartProducts() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const cartRequest = axios.get("http://localhost:4000/cart", config);
        cartRequest.then((response) => {
            if (response.data.products.length === 0) {
                history.push("/cart");
                return;
            }
            setCartProducts(response.data.products);
            setTotalPrice(response.data.total);
        });
        cartRequest.catch((error) => {
            alert("Error!");
        });
    }

    return (
        <Container>
            <Title>Your cart</Title>
            <CheckoutProductsCard
                cartProducts={cartProducts}
                totalPrice={totalPrice}
            />
            <CheckoutForm totalPrice={totalPrice} />
        </Container>
    );
}
const Container = styled.div`
    padding: 20px 20px;
    color: #3a4242;
    background-color: #e1e5ea;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    & > * {
        margin-bottom: 10px;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 30px;
`;