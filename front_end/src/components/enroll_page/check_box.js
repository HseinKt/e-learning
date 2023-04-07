const CheckBox = (props) => {
    return ( 
        <div>
            <label  > 
                <input 
                    className="iput_course"
                    type="checkbox" 
                    id= {props.id} 
                    checked={ props.value}
                    onChange={ props.handleChange }
                />
                {props.label}
            </label>
            {/* <p> checked : {props.value.toString()}</p> */}
        </div>
     );
}
 
export default CheckBox;