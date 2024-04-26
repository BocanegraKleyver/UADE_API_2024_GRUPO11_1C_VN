function ProductoDo({producto, deleteProductoDo, index}) {
    return(
        <div>
            <h3>{producto}</h3>
            <button onClick={()=>deleteProductoDo(index)}>X</button>
        </div>
    )
}
export default ProductoDo;