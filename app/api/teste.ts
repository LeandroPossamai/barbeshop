import bcrypt from 'bcryptjs';

async function testPasswordComparison() {
  const password = '12345'; // Senha fornecida
  const hashedPassword = '$2a$10$JoQRM2wdIJsFqn3uqoJ6vuYh59RIsPW7JZCQT3AVb3eUcs3FBlJhS'; // Senha criptografada

  try {
    // Comparar senha fornecida com a senha criptografada
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Senhas coincidem:', isMatch);
  } catch (error) {
    console.error('Erro ao comparar senhas:', error);
  }
}

testPasswordComparison();
