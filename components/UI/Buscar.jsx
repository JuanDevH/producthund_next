import {useState} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    background-color: #fff;
    position: absolute;
    right: 1rem;
    top: 1.5px;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;

const Buscar = () => {

    const [ busqueda, setBusqueda ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // Redireccionar a /buscar
        Router.push({
            pathname: '/buscar',
            query: { q : busqueda }
        })
    }

    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={handleSubmit}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos..."
                onChange={ e => setBusqueda(e.target.value)}
            />

            <InputSubmit
                type="submit"
            >Buscar</InputSubmit> 
        </form>
    );
}
 
export default Buscar;