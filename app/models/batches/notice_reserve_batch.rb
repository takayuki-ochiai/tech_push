module NoticeReserveBatch
  def self.execute
    users = User.all.includes(:interests)
    users.each do |user|
      NoticeReserver.reserve(user)
    end
  end
end
