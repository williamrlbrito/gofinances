import React, {useState, useEffect} from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome e obrigatorio'),
  amount: Yup
    .number()
    .typeError('Informe um valor numerico')
    .positive('O valor nao pode ser negativo')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transaction');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');  

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    };

    try {
       await AsyncStorage.setItem(dataKey, JSON.stringify(data));  
    } catch (error) {
      console.log(error);
      Alert.alert('Nao foi possivel salvar');
    }
  }

  useEffect(() => {
      async function loadData() {
        const data = await AsyncStorage.getItem(dataKey);   
        console.log(JSON.parse(data!));
      }

      loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm 
              name="amount"
              control={control}
              placeholder="Price"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button 
            title="Enviar" 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        
        <Modal visible={categoryModalOpen} >
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}