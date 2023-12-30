module Messaging
  module Responders
    class Text < BaseResponder
      def self.from_data(data)
        new data
      end

      def initialize(data)
        super
      end
    end
  end
end
