# Use a imagem oficial do PostgreSQL LTS (versão 14)
FROM postgres:16

# Defina variáveis de ambiente para configurar o PostgreSQL
ENV POSTGRES_DB=share_plus
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Exponha a porta padrão do PostgreSQL
EXPOSE 5432

# Defina o ponto de entrada padrão
ENTRYPOINT ["docker-entrypoint.sh"]

# Defina o comando padrão
CMD ["postgres"]

