
import json
import boto3
import uuid
from datetime import datetime

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
tabela = dynamodb.Table('ContatoFormulario')

def lambda_handler(event, context):
    # Obter os dados do corpo da requisição (via API Gateway)
    body = json.loads(event['body'])

    nome = body.get('nome')
    email = body.get('email')
    assunto = body.get('assunto')
    mensagem = body.get('mensagem')

    # Gerar um ID único para o contato
    contato_id = str(uuid.uuid4())
    
    # Registrar a data de envio
    timestamp = datetime.utcnow().isoformat()

    # Dados a serem inseridos no DynamoDB
    item = {
        'ContatoID': contato_id,
        'Nome': nome,
        'Email': email,
        'Assunto': assunto,
        'Mensagem': mensagem,
        'DataEnvio': timestamp
    }

    # Inserir no DynamoDB
    try:
        tabela.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Contato enviado com sucesso!'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
    