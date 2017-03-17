# frozen_string_literal: true

module NoticeSendBatch
  BEFORE_PUBLISH = 3
  NOTIFY_HOUR = 11
  WAIT_SECONDS = 30
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

      body = OneSignalApiClient.notify_messages(
        notice,
        target_player_ids
      )
      # 1通1通の間で送信の間に間隔を空ける
      sleep(WAIT_SECONDS)

      Rails.logger.info("NoticeSendBatch OneSignalApiClient contents: #{notice.contents} response: #{body}")

      next if body.include?('errors')

      send_notices.each do |sended_notice|
        sended_notice.update(notified: true)
      end
    end
  end
end
