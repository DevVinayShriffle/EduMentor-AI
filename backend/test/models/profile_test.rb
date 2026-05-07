require "test_helper"

class ProfileTest < ActiveSupport::TestCase
  test "belongs to user" do
    profile = profiles(:one)

    assert profile.user.present?
  end
end
