"""init

Revision ID: 0f6a15c9fcf8
Revises: 
Create Date: 2025-01-21 11:49:05.701177

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '0f6a15c9fcf8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('adults',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstname', sa.String(), nullable=False),
    sa.Column('lastname', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('children',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('firstname', sa.String(), nullable=False),
    sa.Column('lastname', sa.String(), nullable=False),
    sa.Column('nickname', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.Column('allergies', sa.String(), nullable=False),
    sa.Column('meds', sa.String(), nullable=False),
    sa.Column('topsize', sa.String(), nullable=False),
    sa.Column('pantssize', sa.String(), nullable=False),
    sa.Column('dresssize', sa.String(), nullable=False),
    sa.Column('shoesize', sa.String(), nullable=False),
    sa.Column('schoollevel', sa.String(), nullable=False),
    sa.Column('schoolname', sa.String(), nullable=False),
    sa.Column('favorites', sa.String(), nullable=False),
    sa.Column('hates', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('families',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('invite_code', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('invite_code')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.String(), nullable=False),
    sa.Column('owner', sa.Integer(), nullable=True),
    sa.Column('family_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['family_id'], ['families.id'], name=op.f('fk_events_family_id_families')),
    sa.ForeignKeyConstraint(['owner'], ['adults.id'], name=op.f('fk_events_owner_adults')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('familymembers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('family_id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=False),
    sa.Column('member_type', postgresql.ENUM('adult', 'child', name='member_types'), nullable=False),
    sa.ForeignKeyConstraint(['family_id'], ['families.id'], name=op.f('fk_familymembers_family_id_families')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('files',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(), nullable=False),
    sa.Column('filedate', sa.DateTime(), nullable=False),
    sa.Column('child_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['child_id'], ['children.id'], name=op.f('fk_files_child_id_children')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('files')
    op.drop_table('familymembers')
    op.drop_table('events')
    op.drop_table('families')
    op.drop_table('children')
    op.drop_table('adults')
    # ### end Alembic commands ###
