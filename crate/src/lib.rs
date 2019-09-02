use meval;
use round::round;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn evaluate(expression: String) -> f64 {
    let result = meval::eval_str(expression).unwrap();

    round(result, 3)
}
