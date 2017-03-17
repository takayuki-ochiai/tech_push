# frozen_string_literal: true
class NoticeSerializer < ActiveModel::Serializer
  attributes :id,
             :book_id,
             :user_id,
             :contents,
             :link_url,
             :notify_date

  def notify_date
    object.notify_schedule.strftime('%Y/%m/%d')
  end

  belongs_to :book
end
