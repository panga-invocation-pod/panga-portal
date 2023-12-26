require_relative 'transitions/to_message'
require_relative 'transitions/to_url'
require_relative 'conditions/factory'

module Messaging
  module Transitions
    def self.from_data(data)
      if data.is_a?(String)
        from_string(data)
      elsif data.is_a?(Hash)
        from_hash(data)
      else
        raise ArgumentError, "Unknown transition data: #{data.inspect}"
      end
    end

    def self.from_string(string)
      from_hash({ 'to' => string })
    end

    def self.from_hash(hash)
      transition_type = hash['type'] || 'message'

      case transition_type
      when 'url'
        return ToUrl.new hash['to']
      when 'message'
        raise ArgumentEror, "hash must have a \"to\" field: #{hash.inspect}" if hash['to'].nil?
        return ToMessage.new hash['to'], overrides: hash['overrides'], if_condition: Conditions::Factory.from_data(hash["if"])
      when 'script'
        return ToScript.new hash['to']
      end
    end
  end
end
