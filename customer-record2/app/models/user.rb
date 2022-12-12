class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  #アソシエーション
  has_many :customers, dependent: :destroy
  has_many :histories, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
end
