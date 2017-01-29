module NoticeSendBatch
  BEFORE_PUBLISH = 3
  NOTIFY_HOUR = 11
  def self.execute
    users = User.all.includes(:interests)
    users.each do |user|
      NoticeReserver.reserve(user)
    end
    notices = Notice.where(
      notified: false,
      notify_schedule: Date.today + NOTIFY_HOUR.hours
    ).group(:contents, :headings)

    notices.each do |notice|
      send_notices = Notice.where(
        contents: notice.contents,
        headings: notice.headings,
        notified: false,
        notify_schedule: notice.notify_schedule
      )
      target_player_ids = send_notices.pluck(:one_signal_player_id)

      body = OneSignalApiClient.notifi_messages(
        notice.headings,
        notice.contents,
        target_player_ids
      )

      Rails.logger.info("NoticeSendBatch OneSignalApiClient contents: #{notice.contents} response: #{body}")

      next if body.include?('errors')

      send_notices.each do |sended_notice|
        sended_notice.update(notified: true)
      end
    end
  end
end