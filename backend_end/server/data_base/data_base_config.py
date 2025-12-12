from sqlmodel import create_engine,Session




db_url = 'postgresql://postgres:1234@localhost:5432/vault'

engine = create_engine(url=db_url)



def get_session():
    with Session(engine) as session:
        yield session
