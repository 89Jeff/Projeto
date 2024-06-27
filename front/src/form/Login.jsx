import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8080/user/confirmarlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            senha: password
          })
        });
  
        if (response.ok) {
          // Login bem-sucedido
          alert('Login realizado com sucesso!');
          // Redirecionar para a página de home
          navigate('/home');
        } else {
          // Tratar erro de login
          alert('Credenciais inválidas. Por favor, tente novamente.');
        }
      } catch (error) {
        // Tratar erro de conexão ou outros erros
        console.error('Erro:', error);
        alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
      }
    };
  
    return (
      <div className={styles.container}>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='senha'>Senha:</label>
          <input
            type='password'
            id='senha'
            name='senha'
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>Entrar</button>
          <div className={styles.links}>
          <p><a href='/forgot-password'>Esqueci a senha</a></p>
          <p><a href='/register'>Registrar</a></p>
          </div>
        </form>
        
      </div>
    );
  }
  

export default Login
