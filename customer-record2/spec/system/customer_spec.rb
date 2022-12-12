# frozen_string_literal: true

require 'rails_helper'

describe '投稿のテスト' do
  let!(:customer) { create(:customer, customer_name:'hoge',address:'body',telephone_number:'tele',manager:'mana',memo:'memo') }
  describe 'トップ画面(top_path)のテスト' do
    before do
      visit top_path
    end
    context '表示の確認' do
      it 'top_pathが"/"であるか' do
        expect(current_path).to eq('/')
      end
    end
  end

  describe "投稿画面(customers_new_path)のテスト" do
    before do
      visit customers_new_path
    end
    context '表示の確認' do
      it 'customers_new__pathが"/customers/new"であるか' do
        expect(current_path).to eq('/customers/new')
      end
      it '投稿ボタンが表示されているか' do
        expect(page).to have_button '登録'
      end
    end
  end

  describe "投稿一覧のテスト" do
    before do
      visit customers_path
    end
    context '表示の確認' do
      it '投稿されたものが表示されているか' do
        expect(page).to have_content customer.customer_name
        expect(page).to have_link customer.customer_name
      end
    end
  end

  describe "詳細画面のテスト" do
    before do
      visit customer_path(customer)
    end
    context '表示の確認' do
      it '削除リンクが存在しているか' do
        expect(page).to have_link '顧客情報を削除する'
      end
      it '編集リンクが存在しているか' do
        expect(page).to have_link '編集する'
      end
    end
    context 'リンクの遷移先の確認' do
      it '編集の遷移先は編集画面か' do
        edit_link = find_all('a')[3]
        edit_link.click
        expect(current_path).to eq('/customers/' + list.id.to_s + '/edit')
      end
    end
    context 'customer削除のテスト' do
      it 'customerの削除' do
        expect{ customer.destroy }.to change{ customer.count }.by(-1)
      end
    end
  end

  describe '編集画面のテスト' do
    before do
      visit edit_todolist_path(list)
    end
    context '表示の確認' do
      it '編集前のフォームに表示(セット)されている' do
        expect(page).to have_field 'customer[customer_name]', with: customer.customer_name
        expect(page).to have_field 'customer[address]', with: customer.address
        expect(page).to have_field 'customer[telephone_number]', with: customer.telephone_number
        expect(page).to have_field 'customer[manager]', with: customer.manager
        expect(page).to have_field 'customer[memo]', with: customer.memo
      end
      it '保存ボタンが表示される' do
        expect(page).to have_button '変更を登録'
      end
    end
    
  end
end