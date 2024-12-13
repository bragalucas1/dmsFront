module.exports = {
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transforma arquivos JS/TS com Babel
    },
    testEnvironment: 'jsdom', // Ambiente para testar componentes React
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy', // Ignora arquivos de estilo
    },
    transformIgnorePatterns: ['/node_modules/'], // Evita problemas com dependências externas
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };