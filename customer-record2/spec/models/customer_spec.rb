# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Book, "モデルに関するテスト", type: :model do
	  describe '実際に保存してみる' do
	    it "有効な投稿内容の場合は保存されるか" do
	      expect(FactoryBot.build(:customer)).to be_valid
	    end
	  end
	  context "空白のバリデーションチェック" do
	    it "customer_nameが空白の場合にバリデーションチェックされ空白のエラーメッセージが返ってきているか" do
	      customer = Customer.new(customer_name: '', address:'hoge', telephone_number:'hoge')
	      expect(customer).to be_invalid
	      expect(customer.errors[:customer_name]).to include("can't be blank")
	    end
	    it "addressが空白の場合にバリデーションチェックされ空白のエラーメッセージが返ってきているか" do
	      customer = Customer.new(customer_name: 'hoge', address:'', telephone_number:'hoge')
	      expect(customer).to be_invalid
	      expect(customer.errors[:address]).to include("can't be blank")
	    end
	    it "telephone_numberが空白の場合にバリデーションチェックされ空白のエラーメッセージが返ってきているか" do
	      customer = Customer.new(customer_name: 'hoge', address:'hoge', telephone_number:'')
	      expect(customer).to be_invalid
	      expect(customer.errors[:telephone_number]).to include("can't be blank")
	    end
	  end
end