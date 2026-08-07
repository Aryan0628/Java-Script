const form=document.querySelector('form')
//const height=parseInt(document.querySelector('height').value)
//use less case kyki jese hi page load hoga wese hi empty values le lega
form.addEventListener('submit',function(e){
    e.preventDefault()

    const height=parseInt(document.querySelector('#height').value)
    const weight=parseInt(document.querySelector('#weight').value)
    const results=document.querySelector('#results')
    if(height==='' || height<0 || isNaN(height)){
        results.innerHTML='Please give a valid height';
    }
    if(weight==='' || weight<0 || isNaN(weight)){
        results.innerHTML='Please give a valid weight';
    }
    else{
        const bmi=(weight/((height*height)/10000)).toFixed(2);
        let message='';
        if(bmi<18.6){
            message='Underweight'
        }
        else if(bmi>=18.6 && bmi<24.9){
            message='Normal Weight'
        }
        else{
            message='OverWeight'
        }
        results.innerHTML=`<span>${bmi}</span><br>${message}`;
    }

})