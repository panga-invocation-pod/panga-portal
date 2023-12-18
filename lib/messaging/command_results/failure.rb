module Messaging
  module CommandResults
    class Failure
      def initialize(error_name)
        @error_name = error_name
      end

      attr_reader :error_name
    end
  end
end
