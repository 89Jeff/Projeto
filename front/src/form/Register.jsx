import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha
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
            <h2>REGISTRO</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nome'>Nome:</label>
                <input
                    type='text'
                    id='nome'
                    name='nome'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type='submit'>Registrar</button>
                <div className={styles.links}>
                    <p><a href='/login'>Já tem uma conta? Faça login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
