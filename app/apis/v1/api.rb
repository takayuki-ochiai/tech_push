# frozen_string_literal: true

module API
  # APIのルートクラス
  class Root < Grape::API
    # http://localhost:3000/api/v1/
    mount V1::Root
  end
end
