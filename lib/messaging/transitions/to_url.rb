require_relative 'base_transition'
require 'messaging/url_transition_message'

module Messaging
  module Transitions
    class ToUrl < BaseTransition
      def initialize(url)
        raise ArgumentError, 'url required' if url.blank?
        @url = url
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
