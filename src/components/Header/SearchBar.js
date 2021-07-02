import DropdownMenu from "./DropdownMenu";
import { IoIosSearch } from "react-icons/io";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";

export default function SearchBar() {
    const [productName, setProductName] = useState("");
    const [productsList, setProductsList] = useState();

    function getProducts(e) {
        setProductName(e.target.value);

        const request = axios.get(`
            http://localhost:4000/search?product=${e.target.value}
        `);

        request.then((response) => {
            setProductsList(response.data);
        });

        request.catch((error) => {
            toast.error("Something went wrong, please try again.");
        });
    }

    return(
        <Container>
            <Toaster />
            <DebounceInput
                placeholder="Search for products"
                debounceTimeout={300}
                value={productName}
                onChange={getProducts}
                minLength={3}
            />
            <IoIosSearch />
            {
                productsList?.length > 0
                ? <DropdownMenu
                    setProductName={setProductName}
                    productsList={productsList}
                    setProductsList={setProductsList}
                />
                : ""
            }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 40vw;

    input {
        width: 300px;
        height: 40px;
        padding-left: 10px;
        border-radius: 5px;
        border: none;
        font-size: 15px;
    }

    svg {
        font-size: 25px;
        position: absolute;
        top: 7px;
        right: 5px;
    }    
`;