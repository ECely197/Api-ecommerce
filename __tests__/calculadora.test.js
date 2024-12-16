import {describe, expect, jest} from '@jest/globals';

describe('Tests de la calculadora', ()=>{
    const number1 = 1;
    const number2 = 2;

    it('Deberia poder sumar los numeros y obtener el resultado de la suma', ()=>{
        expect(number1+number2).toBe(3);
    })
})