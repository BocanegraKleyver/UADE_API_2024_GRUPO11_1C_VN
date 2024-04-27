import React from 'react'
import { PageTitle } from '../components/Titles/PageTitle';


export const GestionProductoScreen = () => {


return (

<div class="GestionProducto" className="p-5">
    <div class="navbar navbar-clear">
        <div class="navbar-inner">
         <div class="center sliding">

         </div>
        </div>
    </div>

    <div class="pages navbar-fixed toolbar-fixed">
        <div data-page="Productos" class="page">
            <div class="page-content">


                <div class="nice-header header-fix-top small">
                    <div class="logo">
                        <PageTitle text="Gestiona tus productos"/>
                        <h2>Vendedor, en este lugar podras dar de alta los productos que necesites vender.</h2>
                    </div>
                </div>


            <div class="login-view-box mt-50">
                <div class="list login-form-box">
                    <form name="formIniciar" action="#" method="POST" enctype="multipart/form-data" autocomplete="off" id="formIniciar" class="form nice-label">
                        
                        <div class="form-row">
                            <label for="nombre"><span class="icon-man"></span></label>
                            <input type="text" id="nombre" name="nombre" placeholder="Nombre del Producto"></input>
                        </div>
                        <label class="error" for="nombre"></label>


                        <div class="form-row">
                            <label for="descripcion"><span class="icon-lock"></span></label>
                            <input type="descripcion" id="descripcion" name="descripcion" placeholder="Descripcion del Producto"></input>
                        </div>
                        <label class="error" for="descripcion"></label>

                        <div class="form-row">
                            <label for="categoria"><span class="icon-lock"></span></label>
                            <input type="categoria" id="categoria" name="categoria" placeholder="Categoria del Producto"></input>
                        </div>
                        <label class="error" for="categoria"></label>

                        <div class="form-row">
                            <label for="precio"><span class="icon-lock"></span></label>
                            <input type="precio" id="precio" name="precio" placeholder="Precio del Producto"></input>
                        </div>
                        <label class="error" for="precio"></label>                      

                        <div class="form-row">
                            <label for="foto"><span class="icon-lock"></span></label>
                            <input type="foto" id="foto" name="foto" placeholder="Foto elegida"></input>
                            <div class="input-submit">
                              <button type="submit">Subir Foto del Producto</button>
                            </div>
                        </div>
                        <label class="error" for="foto"></label>    

                        <div class="form-row">
                            <div class="input-submit">
                              <button type="submit">Dar de alta Producto</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            </div>
        </div>
    </div> 
    </div>
    );
};