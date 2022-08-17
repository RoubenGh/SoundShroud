"""empty message

Revision ID: 4e8365a8af35
Revises: 6af33450f348
Create Date: 2022-08-16 20:20:41.805443

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e8365a8af35'
down_revision = '6af33450f348'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('prof_pic_url', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('bio', sa.String(length=500), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'bio')
    op.drop_column('users', 'prof_pic_url')
    # ### end Alembic commands ###
