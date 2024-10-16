
import json
import boto3
import uuid
from datetime import datetime

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
tabela = dynamodb.Table('FeedbackSimulado')

def lambda_handler(event, context):
    # Obter os dados do corpo da requisição (via API Gateway)
    body = json.loads(event['body'])

    pergunta_id = body.get('pergunta_id')
    comentario = body.get('comentario')
    satisfacao = body.get('satisfacao')

    # Gerar um ID único para o feedback
    feedback_id = str(uuid.uuid4())
    
    # Registrar a data e hora
    data_hora = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    # Dados a serem inseridos no DynamoDB
    item = {
        'FeedbackID': feedback_id,
        'PerguntaID': pergunta_id,
        'Comentario': comentario,
        'Satisfacao': satisfacao,
        'DataHora': data_hora
    }

    # Inserir no DynamoDB
    try:
        tabela.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Feedback enviado com sucesso!'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
    