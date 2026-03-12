class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
  ROLES = %w[guest admin].freeze
  has_many :reservations, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :role, inclusion: { in: ROLES }
  def admin? = role == "admin"
end
