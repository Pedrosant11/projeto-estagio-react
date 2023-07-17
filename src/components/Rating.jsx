import React, { useState } from "react";

export default function Rating({ value: defaultValue, onChange }){
    const [value, setValue] = useState(defaultValue)

    return (
        <Rating
            name="simple-controlled"
            // defaultValue={value}
            onChange={(event, newValue) => {
                console.log(newValue)
                setValue(newValue);
                onChange(newValue)
            }}
        />
    )
}