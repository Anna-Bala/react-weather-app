const Form = (props) => {
    return (
        <>
            <div className="form">
                <form>
                    <input className="form__input" type="text" placeholder="Type your city" onChange={props.typing}></input>
                    <button onClick={props.submit} className="form__button">Search</button>
                </form>
            </div>
        </>
    )
}

export default Form;