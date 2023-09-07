import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const emailLetters = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','.','@'
]



function Login( {dispatch} ) {
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(function () {
        const inputEls = document.querySelectorAll('.login-input');

        for (let i = 0; i < inputEls.length; i++) {
            inputEls[i].value = '';
            inputEls[i].classList.add('invalid');
            inputEls[i].classList.remove('valid');
        }
    }, [])

    useEffect(function () {
        const labelsList = document.querySelectorAll('.login-container label');

        labelsList.forEach(label => label.children[1].addEventListener('click', event => label.children[0].focus()))}
    , [])

    function validateEmail(event) {
        const element = event.target; 
        const text = element.value;
        const ltext = text.split('');
        const textLength = ltext.length


        const invalidEmail = () => {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }   
        const validEmail = () => {
            element.classList.remove('invalid');
            element.classList.add('valid');
        }   

        const countLetter = (letter) => {
            let numLetter = 0;
            letter = letter.toLowerCase();
            const lowerText = text.toLowerCase().split('');
            lowerText.forEach(tLetter => tLetter === letter ? numLetter++ : null)
            return numLetter
        }   

        // 0: text length at least 5
        // 1: includes @
        // 2: maximux 1 . and 1 @
        // 3: @ or . are not last letters
        // 4: @ or . are not first letters
        // 5: . does not come before @
        // 6: there is a letter between @ and .

        // 

        const isOk = 
        // condition 0
        textLength >= 4 &&
        // conditions 1, 2
        countLetter('@') === 1 && countLetter('.') < 2 &&
        // condition 3
        ltext[textLength - 1] !== '.' && ltext[textLength - 1] !== '@' &&
        // condition 4
        ltext[0] !== '.' && ltext[0] !== '@' &&
        // condditions 5, 6
        (countLetter('.') === 1 ? ltext.indexOf('@') < ltext.indexOf('.') - 1 : true)
        if (isOk) {
            validEmail();
        } else invalidEmail();
        validateForm()

    }
        
        function validateInput(event, inputLnegth) {
        const element = event.target;
        if (element.value.length < inputLnegth) { 
            element.classList.remove('valid');
            element.classList.add('invalid');
        } else {
            // completedPerc === 3 ? setIsFormValid(true) : null
            element.classList.remove('invalid');
            element.classList.add('valid');
        }
        validateForm()
    }

    function validateForm () {
        const inputEls = document.querySelectorAll('.login-input');
        let completedPerc = 0;
        for (let i = 0; i < inputEls.length; i++) {
            if (inputEls[i].classList.contains('valid')) completedPerc++ 
            else {
                i = inputEls.length;
            }
        }
        completedPerc === 3 ? setIsFormValid(true) : setIsFormValid(false)
    }

    function handleLogin(event) {
    
        event.preventDefault();
    
        const username = document.querySelector('.input-username').value;
        const email = document.querySelector('.input-email').value;
        const password = document.querySelector('.input-pas').value;
        
        if (!username ||!email || !password) return
        
        localStorage.clear('login');
        localStorage.setItem('login', JSON.stringify({username,  email, password}))
        dispatch({type: 'login'})
        navigate(-1);
    }

    return (
        <div className="login-container">
                  <form action="SEND">
        <div className="form-main-div">
          <h1>Log in</h1>
          <label htmlFor='username'>
            <input type="text" name="username" id="f-1-1" className='login-input input-ui input-username' onChange={event => validateInput(event, 5)} required />
            <span className='before'>username</span>
          </label>
          <label htmlFor='email'>
            <input type="email" name="email" id="f-1-2" className='login-input input-ui input-email' onChange={event => validateEmail(event)} required />
            <span className='before'>email</span>
          </label>
          <label htmlFor='password'>
            <input type="password" name="password" id="f-1-3" className='login-input input-ui input-pas' onChange={event => validateInput(event, 8)} required />
            <span className='before'>password</span>
          </label>
          <button className={`btn-log-in btn-ui ${isFormValid ? 'complete': 'incomplete'}`} disabled={!isFormValid} onClick={handleLogin}>Log in</button>
          <button className='btn-reset-pas btn-ui' type='reset'>Reset Password</button>
          <a className='sign-up btn-ui'>or <code>sign up</code></a>
        </div>
      </form>
        </div>
    )
}

export default Login
