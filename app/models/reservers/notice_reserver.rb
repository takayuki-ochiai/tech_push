module NoticeReserver
  BEFORE_PUBLISH = 3
  NOTIFY_HOUR = 11
  def self.reserve(user, reserve_since = BEFORE_PUBLISH)
    topic_ids = user.interests.map(&:topic_id)
    book_ids = BookTopic.where(topic_id: topic_ids)
                        .group(:book_id)
                        .pluck(:book_id)

    books = Book.where(
      id: book_ids,
      sales_date: Date.today.days_since(BEFORE_PUBLISH),
      display_flg: true
    )

    books.each do |book|
      devices = user.deivices
      devices.each do |device|
        Notice.create(
          book_id: book.id,
          user_id: user.id,
          device_id: device.id,
          notified: false,
          one_signal_player_id: device.one_signal_player_id,
          device_model: device.device_model,
          device_os: device.device_os,
          contents: "#{book.title}は#{BEFORE_PUBLISH}日後に発売です",
          headings: 'Tech Push',
          notify_schedule: Date.today + NOTIFY_HOUR.hours
        )
      end
    end
  end
end
