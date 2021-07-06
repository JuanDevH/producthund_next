import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Buscar from '../UI/Buscar';
import Navegacion from './Navegacion';
import Boton from '../UI/Boton';

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const usuario = true;

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>p</Logo>
                    </Link>

                    {/* Buscador */}
                    <Buscar />

                    {/* Nav */}
                    <Navegacion />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    { usuario ? (
                        <>
                            {/* Menú de administración */}
                            <p
                            css={css`
                                margin-right: 2rem;
                            `}
                            >Hola: JuanDev</p>
                            
                            <Boton
                                bgColor="true"
                            >Cerrar Sesión</Boton>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <Boton
                                    bgColor="true"
                                >Login</Boton>
                            </Link>
                            
                            <Link href="/">
                                <Boton>Crear Cuenta</Boton>
                            </Link>
                        </>
                    )}
                </div>
            </HeaderContainer>
        </header>
     );
}
 
export default Header;