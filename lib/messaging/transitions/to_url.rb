require_relative 'base_transition'
require 'messaging/url_transition_message'

module Messaging
  module Transitions
    class ToUrl < BaseTransition
      def initialize(url, if_condition: nil)
        raise ArgumentError, 'url required' if url.blank?
        @url = url
        super if_condition: if_condition
      end

      def apply_overrides(_message)
        nil
      end

      def get_message(_script)
        UrlTransitionMessage.new(@url)
      end
    end
  end
end
