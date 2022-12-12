class Customer < ApplicationRecord

  belongs_to :user
  has_many :histories, dependent: :destroy

#検索
  def self.search(keyword)
  where(["customer_name like? OR address like?", "%#{keyword}%", "%#{keyword}%"])
  end
  
  validates :customer_name, presence: true
  validates :address, presence: true

end
