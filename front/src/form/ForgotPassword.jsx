import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/user/esqueciSenha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });

            console.log('Resposta do servidor:', response);

            if (response.ok) {
                const result = await response.text();
                alert(result);
                navigate('/login');
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Esqueci a Senha</h2>
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
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
