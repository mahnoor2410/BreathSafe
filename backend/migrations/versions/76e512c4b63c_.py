"""empty message

Revision ID: 76e512c4b63c
Revises: a285e72a3cd7
Create Date: 2025-07-04 16:20:44.576773

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76e512c4b63c'
down_revision = 'a285e72a3cd7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('aqi_news')
    op.drop_table('uploaded_pdfs')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('uploaded_pdfs',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('content', sa.TEXT(), nullable=False),
    sa.Column('filename', sa.VARCHAR(length=255), nullable=True),
    sa.Column('uploaded_at', sa.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aqi_news',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('headline', sa.VARCHAR(length=300), nullable=False),
    sa.Column('source', sa.VARCHAR(length=100), nullable=False),
    sa.Column('topic', sa.VARCHAR(length=100), nullable=True),
    sa.Column('timestamp', sa.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
