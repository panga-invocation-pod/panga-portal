module Messaging
  class UrlTransitionMessage
    def initialize(url)
      @url = url
    end

    attr_reader :url

    def as_json(interpolator = nil, script_defaults = {}, context = nil)
      {
        id: url,
        url: url
      }
    end

    def command_for_stage(stage, input:)
      nil
    end

    def display?
      true
    end
  end
end
