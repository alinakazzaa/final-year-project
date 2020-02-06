const Car = t.enums.of('Audi Chrysler Ford Renault Peugeot');

const Select = t.struct({
    car: Car
});

const options = {
    fields: {
        car: {
            options: [
                { value: 'Audi', text: 'Audi' }, // an option
                {
                    label: 'US', options: [ // a group of options
                        { value: 'Chrysler', text: 'Chrysler' },
                        { value: 'Ford', text: 'Ford' }
                    ]
                },
                {
                    label: 'France', options: [ // another group of options
                        { value: 'Renault', text: 'Renault' },
                        { value: 'Peugeot', text: 'Peugeot' }
                    ], disabled: true
                } // use `disabled: true` to disable an optgroup,

            ]
        }
    }
};